(module
 (type $f32_f32_f32_f32_f32_=>_f32 (func (param f32 f32 f32 f32 f32) (result f32)))
 (memory $0 0)
 (export "normalize" (func $assembly/index/normalize))
 (export "calculateIterations" (func $assembly/index/calculateIterations))
 (export "memory" (memory $0))
 (func $assembly/index/normalize (param $0 f32) (param $1 f32) (param $2 f32) (param $3 f32) (param $4 f32) (result f32)
  local.get $0
  local.get $1
  f32.sub
  local.get $2
  local.get $1
  f32.sub
  f32.div
  local.get $4
  local.get $3
  f32.sub
  f32.mul
  local.get $3
  f32.add
 )
 (func $assembly/index/calculateIterations (param $0 f32) (param $1 f32) (param $2 f32) (param $3 f32) (param $4 f32) (result f32)
  (local $5 f32)
  (local $6 f32)
  loop $while-continue|0
   local.get $4
   local.get $5
   f32.gt
   i32.const 0
   local.get $0
   local.get $0
   f32.mul
   local.get $1
   local.get $1
   f32.mul
   f32.add
   f32.const 4
   f32.lt
   select
   if
    local.get $0
    local.get $0
    f32.add
    local.get $1
    f32.mul
    local.get $0
    local.get $0
    f32.mul
    local.get $1
    local.get $1
    f32.mul
    f32.sub
    local.get $2
    f32.add
    local.set $0
    local.get $3
    f32.add
    local.set $1
    local.get $5
    f32.const 1
    f32.add
    local.set $5
    br $while-continue|0
   end
  end
  local.get $5
 )
)
